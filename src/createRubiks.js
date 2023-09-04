import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
} from 'three';

const primary = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddba1681bab1f32cae4_5.svg';
const secondary = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddb2b65d3c3fbe8a742_1.svg';

const line1_1 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddbaff4ad96e1fa9e68_10.svg';
const line1_2 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddb8cc8b36dced2d55b_11.svg';
const line1_3 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddb8cc8b36dced2d565_12.svg';

const line2_1 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddb2cf058e9ad8b5039_13.svg';
const line2_2 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddb127ccf94e51a4ff9_14.svg';
const line2_3 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddc52ac5fec19ed0911_15.svg';

const line3_1 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddbcda9a9a9571657ca_16.svg';
const line3_2 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddb52ac5fec19ed08e6_17.svg';
const line3_3 = 'https://uploads-ssl.webflow.com/646dcaf8ae9c80790aaa759a/64f1cddc8266fc23dc637e55_18.svg';

import { getCubeSize, getVisibleCubeFaces } from './rubiks';

// const COLORS = [0x113766, 0x68B0EB, 0xffffff, 0xffffff, 0xffffff, 0xffffff];
const INSIDE_COLOR = 0xffffff;
const SIZE = getCubeSize();
const VISIBLE_CUBE_FACES = getVisibleCubeFaces(SIZE);
const EDGE_LINE_WIDTHS = {
  2: 6,
  3: 5,
  4: 4,
  5: 3
};
const DEFAULT_EDGE_LINE_WIDTH = 2;

const getMaterials = cubeIndex => {
  const textureLoader = new TextureLoader();

  const textureUrlsDefault = [
    secondary, secondary,
    secondary, secondary,
    secondary, secondary,
  ];

  let materials = textureUrlsDefault
    .map((url) => {
      return textureLoader.load(url);
    })
    .map((texture) => {
      return new MeshBasicMaterial({ map: texture });
    });

  const textureUrlCube26 = line1_1;
  const textureUrlCube17 = line1_2;
  const textureUrlCube8 = line1_3;

  const textureUrlCube23 = line2_1;
  const textureUrlCube14 = line2_2;
  const textureUrlCube5 = line2_3;

  const textureUrlCube20 = line3_1;
  const textureUrlCube11 = line3_2;
  const textureUrlCube2 = line3_3;

  switch (cubeIndex) {
    case 0:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube20) }),
			);
			break;
    case 2:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube2) }),
			);
			break;
    case 3:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube23) }),
			);
			break;
    case 4:
			materials.splice(5, 0,
				new MeshBasicMaterial({ map: textureLoader.load(primary) }),
			);
			break;
		case 5:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube5) }),
			);
			break;
    case 6:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube26) }),
			);
			break;
		case 8:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube8) }),
			);
			break;
    case 9:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube11) }),
			);
			break;
    case 11:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube11) }),
			);
			break;
    case 12:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube14) }),
			);
			break;
		case 14:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube14) }),
			);
			break;
    case 15:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube17) }),
			);
			break;
		case 17:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube17) }),
			);
			break;
    case 18:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube2) }),
			);
			break;
    case 20:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube20) }),
			);
			break;
    case 21:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube5) }),
			);
			break;
    case 22:
			materials.splice(4, 0,
				new MeshBasicMaterial({ map: textureLoader.load(primary) }),
			);
			break;
		case 23:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube23) }),
			);
			break;
    case 24:
			materials.splice(1, 0,
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube8) }),
			);
			break;
		case 26:
			materials.unshift(
				new MeshBasicMaterial({ map: textureLoader.load(textureUrlCube26) }),
			);
			break;
	}

  return materials;

  // const faces = VISIBLE_CUBE_FACES[cubeIndex];
  // return COLORS.map((color, index) =>
  //   new MeshBasicMaterial({ color: faces.includes(index) ? color : INSIDE_COLOR, shininess: 80 })
  // );
};

export const createRubiks = () => {
  const geometry = new BoxGeometry(1, 1, 1);
  const edgeMaterial = new LineBasicMaterial({
    color: INSIDE_COLOR,
    linewidth: EDGE_LINE_WIDTHS[SIZE] || DEFAULT_EDGE_LINE_WIDTH
  });

  const mesh = new Group();
  const meshPosition = (SIZE / 2 - 0.5) * -1;
  mesh.position.set(meshPosition, meshPosition, meshPosition);

  let index = 0;
  for (let z = 0; z < SIZE; z++) {
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const isVisible = !!VISIBLE_CUBE_FACES[index].length;
        // add only visible small cubes to the group of cubes, inner small cubes are not rendered
        if (isVisible) {
          const smallCube = new Mesh(geometry, getMaterials(index));
          smallCube.position.set(x, y, z);
          mesh.add(smallCube);
          const edges = new EdgesGeometry(geometry);
          const lines = new LineSegments(edges, edgeMaterial);
          smallCube.add(lines);
        }
      
        index++;
      }
    }
  }

  return mesh;
};
