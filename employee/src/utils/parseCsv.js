
export const parseCsv = (file) => {
    return new Promise((reslove, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const valueArray = [];
          
          results.data.map((d) => {
            valueArray.push(Object.values(d));
          });

          reslove(valueArray);
        },
        error: (error) => reject(error)
      });
    })
  }