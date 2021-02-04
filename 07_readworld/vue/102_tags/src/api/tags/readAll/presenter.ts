import { model } from './model.ts';
import { view } from './view.ts';
import { Tag } from '../../../types.ts';

import { Request, Response, NextFunction } from '../../../deps.ts';

export async function presenter(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const modelResult: Tag[] = await model();
    const viewResult = await view(modelResult);

    res.setStatus(200);
    res.json(viewResult);
}