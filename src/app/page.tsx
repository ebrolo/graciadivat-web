import React from 'react';
import { InitialLoader } from '@/components/InitialLoader';
import { Navbar } from '@/components/Navbar';
import { HeroLivingLookbook } from '@/components/HeroLivingLookbook';
import { AboutSection } from '@/components/AboutSection';
import { CollectionGallery } from '@/components/CollectionGallery';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ContactBoutique } from '@/components/ContactBoutique';
import { FloatingSocialBar } from '@/components/FloatingSocialBar';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <InitialLoader />
      <Navbar />
      <main style={{ minHeight: '100vh', width: '100%', overflowX: 'clip' }}>
        <HeroLivingLookbook />
        <AboutSection />
        <CollectionGallery />
        <ReviewsSection />
        <ContactBoutique />
      </main>
      <FloatingSocialBar />
      <Footer />
    </>
  );
}
