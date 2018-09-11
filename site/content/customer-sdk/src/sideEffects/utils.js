export const getSideStorageKey = store => {
	const { license, group, uniqueGroups } = store.getState()
	return `side_storage_${ license }` + (uniqueGroups ? `:${ group }` : '')
}
