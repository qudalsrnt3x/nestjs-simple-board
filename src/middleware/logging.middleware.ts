import { Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class LoggingMiddleware implements NestMiddleware {

    private readonly logger = new Logger(LoggingMiddleware.name);

    use(req: Request, res: Response, next: NextFunction) {

        const {method, originalUrl} = req;
        const startTime = Date.now();

        res.on('finish', () => { // api 가 완료되는 시점에 동작이 실행
            const {statusCode} = res;
            const responseTime = Date.now() - startTime;
            
            this.logger.log(`[${method}]${originalUrl}:${statusCode} - ${responseTime}ms`)
        });
        next();
    }
}