import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly searchQuery = signal('');
  protected readonly filterType = signal<'all' | 'active' | 'inactive'>('all');
  protected readonly selectedUser = signal<User | null>(null);

  protected readonly users = signal<User[]>([
    { id: 1, name: 'Иван Петров', email: 'ivan.petrov@mail.ru', active: true },
    { id: 2, name: 'Анна Сидорова', email: 'anna.sidorova@yandex.ru', active: false },
    { id: 3, name: 'Михаил Смирнов', email: 'mikhail.smirnov@gmail.com', active: true },
    { id: 4, name: 'Елена Козлова', email: 'elena.kozlova@mail.ru', active: true },
    { id: 5, name: 'Дмитрий Новиков', email: 'dmitry.novikov@yandex.ru', active: false },
    { id: 6, name: 'Ольга Морозова', email: 'olga.morozova@gmail.com', active: true }
  ]);

  protected readonly filteredUsers = computed(() => {
    let result = this.users();

    const search = this.searchQuery().toLowerCase();
    if (search) {
      result = result.filter(user => user.name.toLowerCase().includes(search));
    }

    const filter = this.filterType();
    if (filter === 'active') {
      result = result.filter(user => user.active);
    } else if (filter === 'inactive') {
      result = result.filter(user => !user.active);
    }

    return result;
  });

  protected onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  protected onFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterType.set(target.value as 'all' | 'active' | 'inactive');
  }

  protected selectUser(user: User): void {
    this.selectedUser.set(user);
  }
}
