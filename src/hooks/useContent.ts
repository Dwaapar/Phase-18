import { useState, useEffect } from 'react';
import { contentService } from '../services';
import type { Database } from '../lib/database.types';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type Guide = Database['public']['Tables']['guides']['Row'];

export function useCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAllCaseStudies();
      setCaseStudies(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { caseStudies, loading, error, refresh: loadCaseStudies };
}

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAllBlogPosts();
      setBlogPosts(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { blogPosts, loading, error, refresh: loadBlogPosts };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAllTestimonials();
      setTestimonials(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { testimonials, loading, error, refresh: loadTestimonials };
}

export function useGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAllGuides();
      setGuides(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { guides, loading, error, refresh: loadGuides };
}
