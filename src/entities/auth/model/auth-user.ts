export class AuthUser {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly email: string,
	) {}
	static create(params: { id: string; name: string; email: string }) {
		return new AuthUser(params.id, params.name, params.email);
	}
	public getName() {
		return this.name;
	}
	public getEmail() {
		return this.email;
	}
}
