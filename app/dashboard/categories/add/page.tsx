import Breadcrumbs from '@/app/ui/categories/breadcrumbs';
import CreateForm from '@/app/ui/categories/create-form';
 
export default function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Add Category',
            href: '/dashboard/categories/add',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}