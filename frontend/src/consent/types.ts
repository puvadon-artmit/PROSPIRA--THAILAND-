export type ConsentCategories = {
necessary: true; // always true
analytics: boolean;
ads: boolean;
};


export type ConsentState = {
given: boolean; // whether a decision has been made
categories: ConsentCategories;
updatedAt?: string;
};