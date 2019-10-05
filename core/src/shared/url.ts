export interface ParsedUrl {
  prePath: string;
  path: string;
  postPath: string;
}

export function parseUrl(url: string): ParsedUrl {
  let index = 0;
  let pathStartIndex: number | undefined;
  let pathLength: number | undefined;

  while (index < url.length && pathLength === undefined) {
    if (pathStartIndex === undefined) {
      if (url[index] === '/') {
        if (url[index + 1] === '/') {
          index += 2;
        } else {
          pathStartIndex = index;
          index++;
        }
      } else {
        index++;
      }
    } else if (pathLength === undefined) {
      if (url[index] === '#' || url[index] === '?') {
        pathLength = index - pathStartIndex;
      } else {
        index++;
      }
    }
  }

  if (pathStartIndex !== undefined && pathLength === undefined) {
    pathLength = url.length - pathStartIndex;
  }

  const prePath = url.substring(0, pathStartIndex === undefined ? url.length + 1 : pathStartIndex);
  const path = pathStartIndex === undefined ? '' : url.substr(pathStartIndex, pathLength);
  const postPath = (
    (pathStartIndex === undefined || pathLength === undefined) ?
      '' :
      url.substr(pathStartIndex + pathLength)
  );

  return {
    prePath,
    path,
    postPath
  };
}

export interface QueryParameterValues {
  [key: string]: string | string[];
}

export function parseQueryString(queryString: string): QueryParameterValues {
  const result: QueryParameterValues = {};

  enum Position {
    key,
    value
  }

  queryString = queryString.trim();

  if (queryString[0] !== '?') {
    return result;
  }

  let position = Position.key;
  let parameterName = '';
  let parameterValue = '';

  const addParameter = () => {
    const existingValue = result[parameterName];
    if (existingValue === undefined) {
      result[parameterName] = parameterValue;
    } else if (typeof existingValue === 'string') {
      result[parameterName] = [existingValue, parameterValue];
    } else {
      existingValue.push(parameterValue);
    }
    parameterName = '';
    parameterValue = '';
  };

  let index = 1;
  while (index < queryString.length) {
    const char = queryString[index];
    if (char === '#') {
      break;
    }
    if (position === Position.key) {
      if (char === '=') {
        position = Position.value;
      } else if (char === '&') {
        addParameter();
      } else {
        parameterName += char;
      }
    } else {
      if (char === '&') {
        addParameter();
        position = Position.key;
      } else {
        parameterValue += char;
      }
    }
    index++;
  }

  if (parameterName) {
    addParameter();
  }

  return result;
}
