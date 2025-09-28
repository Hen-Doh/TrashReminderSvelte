import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {"test":"i am testing"};
}) satisfies PageServerLoad;