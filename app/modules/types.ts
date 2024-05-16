export interface ProjectList {
  hideAdminsLayers: boolean;
  patientId: number | null;
  description: string | null;
  numberOfSlides: number;
  numberOfImages: number;
  isReadOnly: boolean;
  ontologyName: string;
  id: number;
  class: string;
  ontology: number;
  numberOfJobAnnotations: number;
  patientName: string | null;
  blindMode: boolean;
  created: string;
  sex: string | null;
  numberOfAnnotations: number;
  areImagesDownloadable: boolean;
  isClosed: boolean;
  numberOfReviewedAnnotations: number;
  hideUsersLayers: boolean;
  name: string;
  updated: string;
  isRestricted: boolean;
  age: number | null;
  status: string;
}
