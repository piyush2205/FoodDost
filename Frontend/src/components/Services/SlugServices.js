const slugToTitleDictionary = {
    "gorakhpur": "Gorakhpur",
    "dehradoon": "Dehradoon",
    "noida": "Noida",
    "delhi": "Delhi",
}

export const convertSlugToTitle = (slug) => {
    return slugToTitleDictionary[slug] || slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

}