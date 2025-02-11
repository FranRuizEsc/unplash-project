import { IUser } from './user.interfafce';

export interface ICollection {
	id: number;
	title: string;
	description: string;
	published_at: Date;
	last_collected_at: Date;
	updated_at: Date;
	featured: boolean;
	total_photos: number;
	private: boolean;
	share_key: string;
	cover_photo: string;
	user: IUser;
	links: {
		self: string;
		html: string;
		photos: string;
	};
}
