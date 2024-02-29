"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const express_1 = require("express");
const SessionController_1 = require("../controllers/SessionController");
exports.sessionRouter = (0, express_1.Router)();
const controller = new SessionController_1.SessionController();
exports.sessionRouter.post("/", controller.login);
