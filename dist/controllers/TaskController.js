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
exports.TaskController = void 0;
const index_1 = require("../services/index");
class TaskController {
    constructor() {
        this.taskService = new index_1.TaskService();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(res.locals.sub);
            const newTask = yield this.taskService.create(req.body, id);
            return res.status(201).json(newTask);
        });
        this.read = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { category } = req.query;
            const id = Number(res.locals.sub);
            const allTasks = yield this.taskService.read(id, category);
            return res.status(200).json(allTasks);
        });
        this.retrieve = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskId = Number(req.params.id);
            const retrievedTask = yield this.taskService.retrieve(taskId);
            return res.status(200).json(retrievedTask);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(res.locals.sub);
            const taskId = Number(req.params.id);
            const body = req.body;
            const updatedTask = yield this.taskService.update(userId, taskId, body);
            return res.status(200).json(updatedTask);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskId = Number(req.params.id);
            const userId = Number(res.locals.sub);
            const deleteTask = yield this.taskService.delete(userId, taskId);
            return res.status(204).json(deleteTask);
        });
    }
}
exports.TaskController = TaskController;
