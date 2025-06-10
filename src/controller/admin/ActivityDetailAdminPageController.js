import AdminPageController from '../AdminPageController.js';
import { Activity, ActivitySchedule, Room, Teacher } from '../../model/index.js';
import { Op } from 'sequelize';

class ActivityDetailAdminPageController extends AdminPageController {
    constructor() {
        super('admin/activity-detail-admin-page');
    }

    renderPage(errors = [], formData = null) {
        return this.render(async (req, res) => {
            const idRaw = req.query.id;
            const id = Number(idRaw);
            const validId = Number.isInteger(id) && id > 0 ? id : null;

            const teachers = await Teacher.findAll();
            const rooms = await Room.findAll();

            let activity;

            if (formData) {
                activity = formData;
            } else if (validId) {
                activity = await Activity.findByPk(validId, {
                    include: [{ model: ActivitySchedule, as: 'schedules' }]
                });
            }

            return {
                title: validId ? 'Administrar Actividad' : 'Añadir Actividad',
                activity,
                teachers,
                rooms,
                errors
            };
        });
    }

    handleSubmit() {
        return this.handle(async (req, res) => {
            const action = req.body.action;

            const idRaw = req.body.id;
            let id = Number(idRaw);
            if (!Number.isInteger(id) || id <= 0) id = null;

            const name = req.body.name;
            const description = req.body.description;
            const teacherId = Number(req.body.teacherId);
            const imageName = req.file?.filename || null;
            const schedule = req.body.schedule;

            // Carga datos para re-render en caso de error
            const teachers = await Teacher.findAll();
            const rooms = await Room.findAll();

            // Convierte schedule a array
            const scheduleArray = schedule
                ? Array.isArray(schedule)
                    ? schedule
                    : Object.values(schedule)
                : [];

            // Filtra solo horarios válidos
            const validSchedules = scheduleArray.filter(s => {
                return s.startTime && s.endTime && s.roomId;
            });

            // Validación: Debe tener al menos un horario válido
            if (validSchedules.length === 0) {
                const activityFromForm = {
                    id,
                    name,
                    description,
                    teacherId,
                    imageName,
                    schedules: []
                };
                return this.renderPage(['Debe completar al menos un horario para la actividad'], activityFromForm)(req, res);
            }

            // --- Validar conflictos internos entre horarios nuevos ---
            function hasInternalConflicts(schedules) {
                for (let i = 0; i < schedules.length; i++) {
                    for (let j = i + 1; j < schedules.length; j++) {
                        if (parseInt(schedules[i].dayOfWeek) === parseInt(schedules[j].dayOfWeek) &&
                            parseInt(schedules[i].roomId) === parseInt(schedules[j].roomId)) {

                            const startA = schedules[i].startTime;
                            const endA = schedules[i].endTime;
                            const startB = schedules[j].startTime;
                            const endB = schedules[j].endTime;

                            // Check solapamiento: no overlap if endA <= startB or endB <= startA
                            if (!(endA <= startB || endB <= startA)) {
                                return { conflict: true, i, j };
                            }
                        }
                    }
                }
                return { conflict: false };
            }

            const internalConflict = hasInternalConflicts(validSchedules);
            if (internalConflict.conflict) {
                const { i, j } = internalConflict;

                // Mantener imagen actual si no se subió nueva imagen
                let currentImageName = imageName;
                if (!currentImageName && id) {
                    const act = await Activity.findByPk(id);
                    currentImageName = act?.imageName || null;
                }

                const activityFromForm = {
                    id,
                    name,
                    description,
                    teacherId,
                    imageName: currentImageName,
                    schedules: validSchedules.map(s => ({
                        dayOfWeek: parseInt(s.dayOfWeek),
                        startTime: s.startTime,
                        endTime: s.endTime,
                        roomId: parseInt(s.roomId)
                    }))
                };

                return this.renderPage([`Conflicto interno entre horarios #${i + 1} y #${j + 1}`], activityFromForm)(req, res);
            }

            // Obtener horarios actuales para update, para comparar
            let currentSchedules = [];
            if (action === 'update' && id) {
                currentSchedules = await ActivitySchedule.findAll({ where: { activityId: id } });
            }

            // Validar conflictos con otras actividades
            for (const validSchedule of validSchedules) {
                const dayOfWeek = parseInt(validSchedule.dayOfWeek);
                const startTime = validSchedule.startTime;
                const endTime = validSchedule.endTime;
                const roomId = parseInt(validSchedule.roomId);

                const isSameAsCurrent = currentSchedules.some(existing =>
                    existing.dayOfWeek === dayOfWeek &&
                    existing.startTime === startTime &&
                    existing.endTime === endTime &&
                    existing.roomId === roomId
                );

                if (isSameAsCurrent) {
                    continue;
                }

                const conflicts = await ActivitySchedule.findAll({
                    where: {
                        dayOfWeek,
                        roomId,
                        activityId: {
                            [Op.ne]: id || 0
                        },
                        [Op.or]: [
                            { startTime: { [Op.between]: [startTime, endTime] } },
                            { endTime: { [Op.between]: [startTime, endTime] } },
                            {
                                [Op.and]: [
                                    { startTime: { [Op.lte]: startTime } },
                                    { endTime: { [Op.gte]: endTime } }
                                ]
                            }
                        ]
                    }
                });

                if (conflicts.length > 0) {
                    let currentImageName = imageName;
                    if (!currentImageName && id) {
                        const act = await Activity.findByPk(id);
                        currentImageName = act?.imageName || null;
                    }

                    const activityFromForm = {
                        id,
                        name,
                        description,
                        teacherId,
                        imageName: currentImageName,
                        schedules: validSchedules.map(s => ({
                            dayOfWeek: parseInt(s.dayOfWeek),
                            startTime: s.startTime,
                            endTime: s.endTime,
                            roomId: parseInt(s.roomId)
                        }))
                    };
                    const conflictRoom = await Room.findByPk(roomId);
                    const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
                    return this.renderPage([`Conflicto de horario en el día ${weekDays[dayOfWeek-1]}, ${conflictRoom.name}.`], activityFromForm)(req, res);
                }
            }

            // --- Acciones cuando todo está validado ---
            switch (action) {
                case 'save':
                    const newActivity = await Activity.create({ name, description, teacherId, imageName });

                    for (const s of validSchedules) {
                        await ActivitySchedule.create({
                            activityId: newActivity.id,
                            dayOfWeek: parseInt(s.dayOfWeek),
                            startTime: s.startTime,
                            endTime: s.endTime,
                            roomId: parseInt(s.roomId)
                        });
                    }

                    res.redirect(`/admin/actividades/actividad?id=${newActivity.id}`);
                    break;

                case 'update':
                    const activityToUpdate = await Activity.findByPk(id);
                    if (!activityToUpdate) {
                        // Manejar error si la actividad no existe
                        return this.renderPage(['Actividad no encontrada'], null)(req, res);
                    }

                    const fieldsToUpdate = { name, description, teacherId };
                    if (imageName) fieldsToUpdate.imageName = imageName;

                    await activityToUpdate.update(fieldsToUpdate);

                    // Solo eliminar y crear horarios si todo válido
                    await ActivitySchedule.destroy({ where: { activityId: id } });

                    for (const validSchedule of validSchedules) {
                        await ActivitySchedule.create({
                            activityId: id,
                            dayOfWeek: parseInt(validSchedule.dayOfWeek),
                            startTime: validSchedule.startTime,
                            endTime: validSchedule.endTime,
                            roomId: parseInt(validSchedule.roomId)
                        });
                    }

                    res.redirect(`/admin/actividades/actividad?id=${id}`);
                    break;

                case 'delete':
                    if (id) {
                        const activityToDelete = await Activity.findByPk(id);
                        if (activityToDelete) {
                            await activityToDelete.destroy();
                        }
                    }
                    res.redirect('/admin/actividades');
                    break;

                default:
                    // Acción no reconocida
                    res.redirect('/admin/actividades');
                    break;
            }
        });
    }
}

export default new ActivityDetailAdminPageController();