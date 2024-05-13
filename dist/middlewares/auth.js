"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCoach = exports.isAuth = exports.authMiddleware = void 0;
const jwt = __importStar(require("./../lib/jwt"));
const secret_1 = __importDefault(require("./../config/secret"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.auth;
    if (!token) {
        return next();
    }
    try {
        const decoded = yield jwt.verify(token, secret_1.default);
        req.user = decoded;
        next();
    }
    catch (_a) {
        next();
    }
});
exports.authMiddleware = authMiddleware;
const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            status: "fail",
            data: {
                error: "You must login!"
            }
        });
    }
    next();
};
exports.isAuth = isAuth;
const isCoach = (req, res, next) => {
    if (req.user.role !== "coach") {
        return res.status(401).json({
            status: "fail",
            data: {
                error: "You are unauthorized for this action - not a coach!"
            }
        });
    }
    next();
};
exports.isCoach = isCoach;
//# sourceMappingURL=auth.js.map