/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: galleryimages
 * Interface for GalleryImages
 */
export interface GalleryImages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image */
  imageFile?: string;
  /** @wixFieldType text */
  imageTitle?: string;
  /** @wixFieldType text */
  imageDescription?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  altText?: string;
}


/**
 * Collection ID: hostelfacilities
 * Interface for HostelFacilities
 */
export interface HostelFacilities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  facilityName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType boolean */
  isKeyFacility?: boolean;
  /** @wixFieldType image */
  icon?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  availability?: string;
}


/**
 * Collection ID: roomtypes
 * Interface for RoomTypes
 */
export interface RoomTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  roomName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  capacity?: number;
  /** @wixFieldType number */
  monthlyPrice?: number;
  /** @wixFieldType image */
  roomImage?: string;
  /** @wixFieldType boolean */
  isAc?: boolean;
  /** @wixFieldType number */
  roomArea?: number;
}
