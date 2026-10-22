// Every image goes through here so the single-file build can swap paths for inlined data.
export const asset = (path: string) => `/${path}`
export const flowImg = (name: string) => asset(`flow/${name}.webp`)
