declare namespace App.Data {
export type ApiTokenData = {
id: number | null;
name: string;
expires_at: string | null;
last_used_at: string | null;
abilities: Array<string>;
};
export type AppData = {
id: number | null;
name: string;
description: string | null;
mx_name: string;
mx_ip4: string;
mx_ip6: string | null;
website: string;
address_prefix: string | null;
webhook_route: string | null;
created_at: string | null;
avatar_url: string | null;
};
export type LoginData = {
email: string;
password: string;
remember: boolean | null;
};
export type RecipientData = {
id: number | null;
description: string | null;
email_address: string | null;
zone_id: number | null;
zone: App.Data.ZoneData;
created_at: string | null;
};
export type UserData = {
id: number | null;
name: string;
email: string;
avatar_url: string | null;
pending_email: string | null;
is_admin: boolean;
current_app_id: number | null;
};
export type ZoneData = {
id: number | null;
name: string;
webhook_url: string;
is_dns_created: boolean;
description: string | null;
real_webhook_url: string | null;
dns_checked_at: string | null;
created_at: string | null;
};
}
