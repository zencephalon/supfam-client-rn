export interface Link {
	url: string;
}

export default interface Message {
	id: number;
	profile_id: number;
	conversation_id: number;
	type: number;
	message: string;
	qid: number;
	links?: Link[];
	data?: Record<string, unknown>;
}
