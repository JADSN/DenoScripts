import { model } from './model.ts'
import { view } from './view.ts'
import { Tag } from "../../../types.ts";

export async function presenter(): Promise<Tag[]> {
    const modelResult: Tag[] = await model();
    const viewResult: Tag[] = await view(modelResult);
    return await viewResult
}