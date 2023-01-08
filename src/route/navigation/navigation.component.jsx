import { Outlet, Link } from 'react-router-dom';
import './navigation.styles.scss';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
	return (
		<>
			<div className='navigation'>
				<Link to={'/'} className='logo-container'>
					<CrwnLogo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link to={'/shop'} className='nav-link'>
						SHOP
					</Link>
					<Link to={'/auth'} className='nav-link'>
						SIGN IN
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
