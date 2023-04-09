export function toUpperCaseFirstChar(s) {
  return s.toUpperCase()[0] + s.slice(1);
}

export function errorIfNotMaxCharCompliant(params) {
  params.forEach((param) => errorIfNotMaxCharCompliantParam({
    ...param,

  }))
}

export function isMaxCharCompliant(str, max) {
  return str.length <= max
}

function errorIfNotMaxCharCompliantParam({name, str, max}) {
  // TODO: create custom error and simply pass the arg name
  if (!isMaxCharCompliant(str, max)) throw new Error(name)
}

 // errorIfNotMaxCharCompliant({
 //        name_for_human,
 //        max: 50,
 //    })

