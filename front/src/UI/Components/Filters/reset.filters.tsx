export function resetFilters(setFunctions: Function[]){

    setFunctions.forEach((func)=>{
        func("")
    })
}