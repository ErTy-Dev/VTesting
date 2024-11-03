import Header from '@/widgets/Header';
import './style/index.css';
import SideBar from '@/widgets/SideBar';
import { Profile } from '@/pages/Profile';
const App = () => {
	return (
		<div className='flex flex-1 max-sm:flex-col-reverse'>
			<SideBar />
			<div className='flex-1 p-7'>
				<Header />
				<div className='mt-7'>
					<Profile />
				</div>
			</div>
		</div>
	);
};

export default App;
