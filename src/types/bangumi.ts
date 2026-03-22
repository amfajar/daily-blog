export type UserSubjectCollectionResponse = {
	data: UserSubjectCollection[]; // Item list
	total: number; // Total count
	limit: number; // Items per page
	offset: number; // Current offset
};

export type UserSubjectCollection = {
	subject_id: number; // Subject ID
	subject_type: SubjectType; // Subject type
	rate: number; // User rating
	type: CollectionType; // Collection type
	comment?: string | null; // User comment
	tags: string[]; // User tags
	ep_status: number; // Episode progress
	vol_status: number; // Volume progress
	updated_at: string; // Last update time (ISO 8601 format)
	private: boolean; // Is private
	subject: SlimSubject; // Subject details
};

// 1: Wish, 2: Watched, 3: Watching, 4: On Hold, 5: Dropped
export type CollectionType = 1 | 2 | 3 | 4 | 5;

export type SlimSubject = {
	id: number; // Subject ID
	type: SubjectType; // Subject type
	name: string; // Name
	name_cn: string; // Chinese name
	short_summary: string; // Short summary
	date?: string | null; // Date YYYY-MM-DD
	images: SubjectImages; // Images
	volumes: number; // Number of volumes
	eps: number; // Number of episodes
	collection_total: number; // Total collectors
	score: number; // Score
	rank: number; // Rank
	tags: SubjectTag[]; // Tags
};

// 1: Book, 2: Anime, 3: Music, 4: Game, 6: Real
export type SubjectType = 1 | 2 | 3 | 4 | 6;

export type SubjectTag = {
	name: string;
	count: number;
	total_cont: number;
};

export type SubjectImages = {
	large: string;
	common: string;
	medium: string;
	small: string;
	grid: string;
};
