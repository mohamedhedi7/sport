export function generateId(tab: any) {
    if (tab.length == 0) return 1
    let mx = tab[0].id;
    for (let i = 1; i < tab.length; i++) {
        if (tab[i].id > mx) mx = tab[i].id
    }
    return mx + 1
}
export function getFromLs(key: string) {
    return JSON.parse(localStorage.getItem(key) || "[]")
}

export function editObject(key: string, tab: any, obj: any) {
    let position = tab.findIndex((elt: any) => elt.id == obj.id)
    tab[position] = obj
    localStorage.setItem(key, JSON.stringify(tab))
}
export function deleteObject(key: string, tab: any, id:number) {
    let position = tab.findIndex((elt: any) => elt.id == id)
    tab.splice(position, 1)
    localStorage.setItem(key, JSON.stringify(tab))
}