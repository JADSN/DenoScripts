import { Tag } from '../../../types.ts';

// * Database
import { presenter } from '../../../database/tags/readAll/presenter.ts';

export async function model(): Promise<Tag[]> {
    const db: Tag[] = await presenter();
    return await db
}