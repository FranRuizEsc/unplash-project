export interface IUser {
	id: string;
	username: string;
	name: string;
	last_name: string;
	social: {
		instagram_username?: string;
		twitter_username?: string;
		portfolio_url?: string;
		twitter_url?: string;
		instagram_url?: string;
	}
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
	tags: {
		custom: [{
			type: string;
			title: string
		}];
	};
}
