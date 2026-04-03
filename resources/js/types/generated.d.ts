declare namespace App.Data {
export type LoginData = {
email: string;
password: string;
remember: boolean | null;
};
export type UserData = {
id: number | null;
name: string;
email: string;
avatar_url: string | null;
pending_email: string | null;
};
}
