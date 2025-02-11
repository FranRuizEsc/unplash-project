import { ICollection } from './collection.interface';
import { IUser } from './user.interfafce';

export interface IPhoto {
	id: string;
	created_at: Date;
	updated_at: Date;
	width: number;
	height: number;
	downloads: number;
	color: string;
	likes: number;
	liked_by_user: boolean;
	description: string;
	user: IUser;
	current_user_collections: ICollection[];
	urls: {
		raw: string;
		full: string;
		regular: string;
		small: string;
		thumb: string;
	};
	links: {
		self: string;
		html: string;
		download: string;
		download_location: string;
	};
	exif: {
		make: string;
		model: string;
		exposure_time: string;
		aperture: string;
		focal_length: string;
		iso: number;
	};
	location: {
		city: string;
		country: string;
		position: {
			latitude: number;
			longitude: number;
		};
	};
	tags: { title: string }[];
	views: number
}
