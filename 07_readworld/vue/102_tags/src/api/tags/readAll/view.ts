import { Tag, TagResult } from '../../../types.ts';

export async function view(model: Tag[]): Promise<TagResult> {

    const tagDescriptions = model.map(model => {
        return model['description']
    });

    const result = <TagResult>{
        tags: tagDescriptions
    }

    return await result
}