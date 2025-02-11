export interface IUser {
	id: string;
	username: string;
	name: string;
	portfolio_url: string;
	bio: string;
	location: string;
	total_likes: number;
	total_photos: number;
	total_collections: number;
	instagram_username: string;
	twitter_username: string;
	followers_count: number;
	following_count: number;
	profile_image: {
		small: string;
		medium: string;
		large: string;
	};
	links: {
		self: string;
		html: string;
		photos: string;
		likes: string;
		portfolio: string;
	};
}
