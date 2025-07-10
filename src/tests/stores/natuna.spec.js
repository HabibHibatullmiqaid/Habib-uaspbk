import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useNatunaStore } from '../../stores/natuna'; // Sesuaikan path ke store Anda
import axios from 'axios';

// --- Mocking Axios ---
// Kita membuat versi palsu (mock) dari axios.
// Ini sangat penting agar unit test kita tidak benar-benar mengirim request ke API.
// Unit test harus cepat, terisolasi, dan tidak bergantung pada network.
vi.mock('axios');

// Mendefinisikan grup test untuk 'Natuna Store'
describe('Natuna Store', () => {
  // `beforeEach` akan dijalankan sebelum setiap blok `it` (test case).
  // Ini memastikan setiap test mendapatkan state yang bersih dan tidak terpengaruh test lain.
  beforeEach(() => {
    // Membuat instance Pinia baru dan mengaktifkannya
    setActivePinia(createPinia());
  });

  // --- Test Case 1: Menguji State Awal ---
  it('seharusnya memiliki state awal yang kosong dan benar', () => {
    // Arrange: Buat instance store
    const store = useNatunaStore();

    // Assert: Periksa apakah nilai awal sesuai harapan
    expect(store.destinations).toEqual([]); // Harusnya array kosong
    expect(store.articles).toEqual([]);     // Harusnya array kosong
    expect(store.loading).toBe(false);      // Loading harus false
    expect(store.totalDestinations).toBe(0); // Getter harus mengembalikan 0
  });

  // --- Test Case 2: Menguji Action `fetchDestinations` ---
  it('seharusnya mengambil data destinasi dan mengisi state', async () => {
    // Arrange: Siapkan data palsu yang akan dikembalikan oleh axios
    const mockData = [
      { id: 1, name: 'Taman Batu Alif' },
      { id: 2, name: 'Pulau Senua' },
    ];
    // Atur agar `axios.get` mengembalikan data palsu kita saat dipanggil
    axios.get.mockResolvedValue({ data: mockData });

    const store = useNatunaStore();

    // Act: Panggil action yang ingin diuji
    await store.fetchDestinations(); // Gunakan await karena ini fungsi async

    // Assert: Periksa apakah state sudah berubah sesuai harapan
    expect(store.loading).toBe(false); // Loading harus kembali ke false
    expect(store.destinations).toHaveLength(2); // Panjang array harus 2
    expect(store.destinations[0].name).toBe('Taman Batu Alif'); // Konten harus sesuai
    expect(store.totalDestinations).toBe(2); // Getter harus terupdate
  });

  // --- Test Case 3: Menguji Getter `featuredDestinations` ---
  it('seharusnya mengembalikan 3 destinasi unggulan dari getter', () => {
    // Arrange: Isi state secara manual untuk menguji getter
    const store = useNatunaStore();
    store.destinations = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
      { id: 4, name: 'D' },
    ];

    // Act & Assert: Periksa apakah getter mengembalikan data yang benar
    expect(store.featuredDestinations).toHaveLength(3); // Getter harusnya mengambil 3 item pertama
    expect(store.featuredDestinations[2].name).toBe('C');
  });

  // --- Test Case 4: Menguji penanganan error pada action ---
  it('seharusnya menangani error saat gagal mengambil data', async () => {
    // Arrange: Atur agar `axios.get` menghasilkan error
    axios.get.mockRejectedValue(new Error('Network Error'));
    const store = useNatunaStore();
    
    // Act: Panggil action
    await store.fetchDestinations();
    
    // Assert: Periksa apakah state tetap kosong dan loading kembali ke false
    expect(store.destinations).toEqual([]);
    expect(store.loading).toBe(false);
  });
});