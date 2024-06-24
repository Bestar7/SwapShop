const materialsToOptions = (materials: Material[]): MaterialOption[] => {
  return groupBy(materials);
}

const groupBy = (materials: Material[]): MaterialOption[] => {
  return materials.reduce((res:MaterialOption[],item:Material)=>{

    // create category
    let existingCat = res.find(mat=>mat.label === item.category);
    if (!existingCat){
      existingCat = { label:item.category, options:[] };
      res.push(existingCat);

    }
    
    // create subcategory
    existingCat!.options.push({ label: item.subcategory, value: item });

    return res;
}, []);
}

export { materialsToOptions }