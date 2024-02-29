"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const prisma_1 = require("../database/prisma");
const errors_1 = require("../errors");
class TaskService {
    constructor() {
        this.create = (payload, userId) => __awaiter(this, void 0, void 0, function* () {
            const newTask = yield prisma_1.prisma.task.create({
                data: Object.assign(Object.assign({}, payload), { userId })
            });
            return newTask;
        });
        this.read = (userId, search) => __awaiter(this, void 0, void 0, function* () {
            if (search) {
                const foundTasks = yield prisma_1.prisma.task.findMany({
                    where: {
                        userId: userId,
                        category: {
                            name: {
                                contains: search
                            },
                            userId: userId,
                        },
                    },
                    include: {
                        category: true,
                    },
                });
                return foundTasks;
            }
            const tasksOwnedByUser = yield prisma_1.prisma.task.findMany({
                where: { userId: userId },
                include: { category: true }
            });
            return tasksOwnedByUser;
        });
        this.retrieve = (userId) => __awaiter(this, void 0, void 0, function* () {
            const foundTask = yield prisma_1.prisma.task.findFirst({
                where: { id: userId },
                include: {
                    category: true
                }
            });
            return foundTask;
        });
        this.update = (userId, taskId, data) => __awaiter(this, void 0, void 0, function* () {
            const currentTask = yield prisma_1.prisma.task.findFirst({ where: { id: taskId } });
            if (!currentTask || currentTask.userId !== userId) {
                throw new errors_1.AppError("Forbidden", 403);
            }
            const updateTask = yield prisma_1.prisma.task.update({ where: { id: taskId }, data: Object.assign({}, data) });
            return updateTask;
        });
        this.delete = (userId, taskId) => __awaiter(this, void 0, void 0, function* () {
            const currentTask = yield prisma_1.prisma.task.findFirst({ where: { id: taskId } });
            if (!currentTask || currentTask.userId !== userId) {
                throw new errors_1.AppError("Forbidden", 403);
            }
            const deleteTask = yield prisma_1.prisma.task.delete({
                where: {
                    id: taskId,
                    userId: userId
                }
            });
            return deleteTask;
        });
    }
}
exports.TaskService = TaskService;
;
