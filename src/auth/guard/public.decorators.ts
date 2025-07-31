import { SetMetadata } from '@nestjs/common';


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
// /**
//  * Custom decorator to mark a route as public.
//  * This can be used to skip authentication for specific routes.
//  */
// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// /**
//  * Custom decorator to check if a route is public.
//  * This can be used in guards to determine if authentication should be skipped.
//  */
// export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

// /**
//  * Custom decorator to check if a route is not public.
//  * This can be used in guards to enforce authentication for specific routes.
//  */
// export const IsNotPublic = () => SetMetadata(IS_PUBLIC_KEY, false);

// /**
//  * Custom decorator to check if a route is public or not.
//  * This can be used in guards to determine the public status of a route.
//  */
// export const IsPublicOrNot = () => SetMetadata(IS_PUBLIC_KEY, 'publicOrNot');

// /**
//  * Custom decorator to check if a route is private.
//  * This can be used in guards to enforce authentication for private routes.
//  */
// export const IsPrivate = () => SetMetadata(IS_PUBLIC_KEY, false);

// /**
//  * Custom decorator to check if a route is not private.
//  * This can be used in guards to allow public access to specific routes.
//  */
// export const IsNotPrivate = () => SetMetadata(IS_PUBLIC_KEY, true);

// /**
//  * Custom decorator to check if a route is public or private.
//  * This can be used in guards to determine the access level of a route.
//  */
// export const IsPublicOrPrivate = () => SetMetadata(IS_PUBLIC_KEY, 'publicOrPrivate');   