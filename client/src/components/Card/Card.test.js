import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

// Mock de datos para el componente Card
const mockData = {
  name: 'pikachu',
  image: 'pikachu-image-url',
  types: ['electric'],
};

describe('Card Component', () => {
  test('Renderiza correctamente con datos proporcionados', () => {
    render(
      <MemoryRouter>
        <Card {...mockData} />
      </MemoryRouter>
    );

    // Verificar que los elementos se renderizan correctamente
    expect(screen.getByAltText('pokemon image')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
  });

  test('Redirige al detalle del pokemon al hacer clic en el enlace', () => {
    render(
      <MemoryRouter>
        <Card {...mockData} />
      </MemoryRouter>
    );

    // Verificar que el enlace redirige al detalle del pokemon
    const linkElement = screen.getByText('Pikachu');
    userEvent.click(linkElement);

    // Verificar que la redirección ocurra
    expect(window.location.pathname).toBe('/detail/pikachu');
  });

  test('Maneja la carga de la imagen correctamente', () => {
    render(
      <MemoryRouter>
        <Card {...mockData} />
      </MemoryRouter>
    );

    // Verificar que la clase 'loaded' se agrega después de cargar la imagen
    const imageElement = screen.getByAltText('pokemon image');
    expect(imageElement).not.toHaveClass('loaded');
    imageElement.dispatchEvent(new Event('load'));
    expect(imageElement).toHaveClass('loaded');
  });
});