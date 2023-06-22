function divPathArr(csvPath: string[], workerCount: number) {
    const csvPathLength = csvPath.length;
    const count = Math.round(csvPathLength / workerCount);
    const divArr = [];
  
    let startIndex = 0;
    for (let i = 0; i < count; i++) {
      const endIndex = Math.min(startIndex + workerCount, csvPathLength);
      divArr.push(csvPath.slice(startIndex, endIndex));
      startIndex = endIndex;
    }
  
    return divArr;
}

export default divPathArr;