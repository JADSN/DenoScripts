import { model } from './model.ts';
import { view } from './view.ts';

import { Request, Response, NextFunction } from '../../deps.ts';

// * Hello World
export async function presenter(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const modelResult = await model();
    const viewResult = await view(modelResult);
    res.send(viewResult);
}