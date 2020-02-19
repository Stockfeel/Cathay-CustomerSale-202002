import { injectGlobal } from 'vue-styled-components';

import NotoSansTCEot from './noto-sans-tc-v9-chinese-traditional-regular.eot';
import NotoSansTCWoff2 from './noto-sans-tc-v9-chinese-traditional-regular.woff2';
import NotoSansTCWoff from './noto-sans-tc-v9-chinese-traditional-regular.woff';
import NotoSansTCSvg from './noto-sans-tc-v9-chinese-traditional-regular.svg';
import NotoSansTCEot700 from './noto-sans-tc-v9-chinese-traditional-700.eot';
import NotoSansTCWoff2700 from './noto-sans-tc-v9-chinese-traditional-700.woff2';
import NotoSansTCWoff700 from './noto-sans-tc-v9-chinese-traditional-700.woff';
import NotoSansTCSvg700 from './noto-sans-tc-v9-chinese-traditional-700.svg';

import LatoEot from './lato-v16-latin-regular.eot';
import LatoWoff2 from './lato-v16-latin-regular.woff2';
import LatoWoff from './lato-v16-latin-regular.woff';
import LatoTtf from './lato-v16-latin-regular.ttf';
import LatoSvg from './lato-v16-latin-regular.svg';
import LatoEot700 from './lato-v16-latin-700.eot';
import LatoWoff2700 from './lato-v16-latin-700.woff2';
import LatoWoff700 from './lato-v16-latin-700.woff';
import LatoTtf700 from './lato-v16-latin-700.ttf';
import LatoSvg700 from './lato-v16-latin-700.svg';

export default injectGlobal`
/* noto-sans-tc-regular - chinese-traditional */
	@font-face {
	  font-family: 'Noto Sans TC';
	  font-style: normal;
	  font-weight: 400;
	  src: url('${NotoSansTCEot}'); /* IE9 Compat Modes */
	  src: local('Noto Sans TC Regular'), local('NotoSansTC-Regular'),
	       url('${NotoSansTCEot}') format('embedded-opentype'), /* IE6-IE8 */
	       url('${NotoSansTCWoff2}') format('woff2'), /* Super Modern Browsers */
	       url('${NotoSansTCWoff}') format('woff'), /* Modern Browsers */
	       url('${NotoSansTCSvg}') format('svg'); /* Legacy iOS */
	}
	/* noto-sans-tc-700 - chinese-traditional */
	@font-face {
	  font-family: 'Noto Sans TC';
	  font-style: normal;
	  font-weight: 700;
	  src: url('${NotoSansTCEot700}'); /* IE9 Compat Modes */
	  src: local('Noto Sans TC Bold'), local('NotoSansTC-Bold'),
	       url('${NotoSansTCEot700}') format('embedded-opentype'), /* IE6-IE8 */
	       url('${NotoSansTCWoff2700}') format('woff2'), /* Super Modern Browsers */
	       url('${NotoSansTCWoff700}') format('woff'), /* Modern Browsers */
	       url('${NotoSansTCSvg700}') format('svg'); /* Legacy iOS */
	}

	/* lato-regular - latin */
	@font-face {
	  font-family: 'Lato';
	  font-style: normal;
	  font-weight: 400;
	  src: url('${LatoEot}'); /* IE9 Compat Modes */
	  src: local('Lato Regular'), local('Lato-Regular'),
	       url('${LatoEot}') format('embedded-opentype'), /* IE6-IE8 */
	       url('${LatoWoff2}') format('woff2'), /* Super Modern Browsers */
	       url('${LatoWoff}') format('woff'), /* Modern Browsers */
	       url('${LatoTtf}') format('truetype'), /* Safari, Android, iOS */
	       url('${LatoSvg}') format('svg'); /* Legacy iOS */
	}
	/* lato-700 - latin */
	@font-face {
	  font-family: 'Lato';
	  font-style: normal;
	  font-weight: 700;
	  src: url('${LatoEot700}'); /* IE9 Compat Modes */
	  src: local('Lato Bold'), local('Lato-Bold'),
	       url('${LatoEot700}') format('embedded-opentype'), /* IE6-IE8 */
	       url('${LatoWoff2700}') format('woff2'), /* Super Modern Browsers */
	       url('${LatoWoff700}') format('woff'), /* Modern Browsers */
	       url('${LatoTtf700}') format('truetype'), /* Safari, Android, iOS */
	       url('${LatoSvg700}') format('svg'); /* Legacy iOS */
	}
`;