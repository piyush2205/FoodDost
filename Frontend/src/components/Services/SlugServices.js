const slugToTitleDictionary = {
    "Your-Order": "Order-List",
    "sasdawdnmasdbjasbd": "Res"

}

export const convertSlugToTitle = (slug) => {
    return slugToTitleDictionary[slug] || slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

}