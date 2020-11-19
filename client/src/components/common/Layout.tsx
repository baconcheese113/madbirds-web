import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

type StyleProps = {
	flex?: boolean | number,
	padding?: number,
	margin?: number,
	flexBasis: number | string,
};

const useClasses = makeStyles(() => ({
	flex: ({ flex, flexBasis }: StyleProps) => {
		const flexBoolValue = flex === true ? 1 : 0;
		const flexValue = Number.isFinite(flex) ? flex : flexBoolValue;
		const flexBasisValue = Number.isFinite(flexBasis) ? `${flexBasis}px` : flexBasis;
		return flexValue ? { flex: `${flexValue} 1 ${flexBasisValue}` } : {};
	},
	column: {
		flexDirection: 'column',
		boxSizing: 'border-box',
		display: 'flex',
	},

	row: {
		flexDirection: 'row',
		boxSizing: 'border-box',
		display: 'flex',
	},

	wrap: {
		flexWrap: 'wrap',
	},

	flexBasisAuto: {
		flexBasis: 'auto',
	},

	justifyStart: {
		justifyContent: 'flex-start',
	},

	justifyCenter: {
		justifyContent: 'center',
	},

	justifyStretch: {
		justifyContent: 'stretch',
	},

	justifyEnd: {
		justifyContent: 'flex-end',
	},

	justifySpaceAround: {
		justifyContent: 'space-around',
	},

	justifySpaceBetween: {
		justifyContent: 'space-between',
	},

	alignStart: {
		alignItems: 'flex-start',
		alignContent: 'flex-start',
	},

	alignCenter: {
		alignItems: 'center',
		alignContent: 'center',
	},

	alignStretch: {
		alignItems: 'stretch',
		alignContent: 'stretch',
	},

	alignEnd: {
		alignItems: 'flex-end',
		alignContent: 'flex-end',
	},
	spacing: ({ margin, padding }: StyleProps) => {
		const marginStyle = Number.isFinite(margin) ? { margin } : {};
		const paddingStyle = Number.isFinite(padding) ? { padding } : {};
		return { ...marginStyle, ...paddingStyle };
	},
}));

type Props = {
	center?: boolean,
	wrap?: boolean,
	column?: boolean,
	align: string,
	flex?: boolean | number,
	flexBasis: string | number,
	onClick?: (event: React.SyntheticEvent<HTMLDivElement>) => any,
	padding?: number,
	margin?: number,
  children?: React.ReactNode,
	classes?: {
		root?: string,
	},
	'data-cy'?: string,
};

export default function Layout(props: Props) {
	const {
		children,
		wrap,
		flex,
		flexBasis,
		column,
		margin,
		padding,
		center,
		classes,
		align,
		...extraProps
	} = props;

	const internalClasses = useClasses({ flex, flexBasis, margin, padding });

	const getJustifyClass = (justify: string) => {
		if (justify === 'start') {
			return internalClasses.justifyStart;
		} else if (justify === 'center') {
			return internalClasses.justifyCenter;
		} else if (justify === 'end') {
			return internalClasses.justifyEnd;
		} else if (justify === 'stretch') {
			return internalClasses.justifyStretch;
		} else if (justify === 'space-between') {
			return internalClasses.justifySpaceBetween;
		} else if (justify === 'space-around') {
			return internalClasses.justifySpaceAround;
		}
	};

	const getAlignClass = (align: string) => {
		if (align === 'start') {
			return internalClasses.alignStart;
		} else if (align === 'center') {
			return internalClasses.alignCenter;
		} else if (align === 'end') {
			return internalClasses.alignEnd;
		} else if (align === 'stretch') {
			return internalClasses.alignStretch;
		}
	};

	const getFlexChildClasses = () => {
		if (center) return [getJustifyClass('center'), getAlignClass('center')];
		const [justify, align] = props.align.split(' ');
		const alignStyle = getAlignClass(align);
		const justifyStyle = getJustifyClass(justify);
		return [justifyStyle, alignStyle];
	};

	const getFlexBasisFix = () => flex && internalClasses.flexBasisAuto;  
  
  return (
    <div
      {...extraProps}
      className={clsx([
        column ? internalClasses.column : internalClasses.row,
        ...getFlexChildClasses(),
        wrap && internalClasses.wrap,
        getFlexBasisFix(),
        internalClasses.flex,
        internalClasses.spacing,
        classes && classes.root,
      ])}>
      {children}
    </div>
  );
}

Layout.defaultProps = {
	align: 'start stretch',
	flexBasis: '0%',
};