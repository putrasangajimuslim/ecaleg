import { Injectable } from '@angular/core';
import { ReviewData } from '.././models/review-data.model';

export const STORAGE_KEY_PREFIX = 'REVIEW_';

@Injectable({
  providedIn: 'root',
})
export class EcalegReviewDataService {
  getSavedReview(menu = 'ROLE_MANAGEMENT') {
    const reviewString = sessionStorage.getItem(STORAGE_KEY_PREFIX + menu);
    if (reviewString) {
      return JSON.parse(reviewString);
    }
    return null;
  }

  setReview<T>(data: ReviewData<T>, menu = 'ROLE_MANAGEMENT') {
    sessionStorage.setItem(STORAGE_KEY_PREFIX + menu, JSON.stringify(data));
  }

  deleteSavedReview(id: string, menu = 'ROLE_MANAGEMENT') {
    const savedReview = this.getSavedReview(menu);
    if (id && savedReview) {
      delete savedReview[id];
      if (!Object.entries(savedReview).length) {
        sessionStorage.removeItem(STORAGE_KEY_PREFIX + menu);
      } else {
        this.setReview(savedReview, menu);
      }
    }
  }

  saveReview<T>(
    id: string,
    data: T,
    menu = 'ROLE_MANAGEMENT',
  ) {
    const savedReview = this.getSavedReview(menu);
    if (savedReview) {
      savedReview[id] = { data };
      this.setReview(savedReview, menu);
    } else {
      const newObj: ReviewData<T> = {};
      newObj[id] = { data };
      this.setReview(newObj, menu);
    }
  }

  getSavedReviewById(id: string, menu = 'ROLE_MANAGEMENT') {
    const savedReview = this.getSavedReview(menu);
    return (savedReview?.[id]) || null;
  }
}
