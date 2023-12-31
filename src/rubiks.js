const DEFAULT_CUBE_SIZE = 3;

const AXLES = ['x', 'y', 'z'];

const AXIS_TO_ROTATE_MAP = {
  x: ['y', 'z'],
  y: ['x', 'z'],
  z: ['x', 'y']
}

const DIRECTIONS_MAP = {
  x: [-1, 1],
  y: [1, -1],
  z: [-1, 1]
};

const getDeltaList = (vectorA, vectorB) => {
  let delta = [];

  if (vectorA.x !== vectorB.x) delta.push('x');
  if (vectorA.y !== vectorB.y) delta.push('y');
  if (vectorA.z !== vectorB.z) delta.push('z');

  return delta;
};

// TODO: review and implement a better solution for rotations
const getAxisToRotate = (deltaAxis, orbitHorizontal) => {
  const axles = AXIS_TO_ROTATE_MAP[deltaAxis];
  return Math.abs(orbitHorizontal) < 45 || Math.abs(orbitHorizontal) > 135 ? axles[0] : axles[1];
};

const getDirection = (startPosition, endPosition, delta, orbitHorizontal) => {
  const directions = DIRECTIONS_MAP[delta];
  const direction = -135 < orbitHorizontal && orbitHorizontal < 45 ? directions[0] : directions[1];

  return direction * (startPosition[delta] - endPosition[delta] > 0 ? 1 : -1);
};

export const getRotationDetails = (orbitControls, startObject, endObject) => {
  const startPosition = startObject.position.round();
  const endPosition = endObject.position.round();

  if (!startPosition.equals(endPosition)) {
    const deltaList = getDeltaList(startPosition, endPosition);

    // if start and end objects are on same face
    if (deltaList.length === 1) {
      const orbitHorizontal = orbitControls.getAzimuthalAngle() * 180 / Math.PI;
      const deltaAxis = deltaList[0];
      const axisToRotate = getAxisToRotate(deltaAxis, orbitHorizontal);
      return {
        axisToRotate,
        layer: startPosition[axisToRotate],
        direction: getDirection(startPosition, endPosition, deltaAxis, orbitHorizontal)
      };
    }
  }
  return null;
};

export const getScrambleRotation = size => {
  const axisToRotate = AXLES[Math.floor(Math.random() * Math.floor(3))];
  const layer = Math.floor(Math.random() * Math.floor(size));
  const direction = Math.floor(Math.random() * Math.floor(2)) ? 1 : -1;

  return {
    axisToRotate,
    layer,
    direction
  };
};

// TODO: investigate if this could be done in a simpler way
export const getVisibleCubeFaces = size => {
  const faces = [];

  // Back
  faces.push([1, 3, 5]); // corner 1
  for (let i = 0; i < size - 2; i++) {
    faces.push([3, 5]);
  }
  faces.push([0, 3, 5]); // corner 2
  if (size > 2) {
    for (let i = 0; i < size - 2; i++) {
      faces.push([1, 5]);
      for (let j = 0; j < size - 2; j++) {
        faces.push([5]);
      }
      faces.push([0, 5]);
    }
  }
  faces.push([1, 2, 5]); // corner 3
  for (let i = 0; i < size - 2; i++) {
    faces.push([2, 5]);
  }
  faces.push([0, 2, 5]); // corner 4
  // Center
  if (size > 2) {
    for (let k = 0; k < size - 2; k++) {
      faces.push([1, 3]);
      for (let i = 0; i < size - 2; i++) {
        faces.push([3]);
      }
      faces.push([0, 3]);
      for (let i = 0; i < size - 2; i++) {
        faces.push([1]);
        for (let j = 0; j < size - 2; j++) {
          faces.push([]);
        }
        faces.push([0]);
      }
      faces.push([1, 2]);
      for (let i = 0; i < size - 2; i++) {
        faces.push([2]);
      }
      faces.push([0, 2]);
    }
  }
  // Front
  faces.push([1, 3, 4]); // corner 5
  for (let i = 0; i < size - 2; i++) {
    faces.push([3, 4]);
  }
  faces.push([0, 3, 4]); // corner 6
  if (size > 2) {
    for (let i = 0; i < size - 2; i++) {
      faces.push([1, 4]);
      for (let j = 0; j < size - 2; j++) {
        faces.push([4]);
      }
      faces.push([0, 4]);
    }
  }
  faces.push([1, 2, 4]); // corner 7
  for (let i = 0; i < size - 2; i++) {
    faces.push([2, 4]);
  }
  faces.push([0, 2, 4]); // corner 8

  return faces;
}

export const getCubeSize = () => {
  // const queryParams = new URLSearchParams(window.location.search);
  // const sizeSelector = document.getElementById('size-select');

  // const size = queryParams.get('size');
  // if (size) {
  //   sizeSelector.value = size;
  // } else {
  //   queryParams.set('size', DEFAULT_CUBE_SIZE);
  //   sizeSelector.value = DEFAULT_CUBE_SIZE;
  //   history.replaceState(null, null, `?${queryParams.toString()}`);
  // }

  // return size || DEFAULT_CUBE_SIZE;

  return DEFAULT_CUBE_SIZE;
};
