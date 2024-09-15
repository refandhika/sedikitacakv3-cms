import Breadcrumbs from '@/app/ui/projects/breadcrumbs';
import CreateForm from '@/app/ui/projects/create-form';
 
export default function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/dashboard/projects' },
          {
            label: 'Add Project',
            href: '/dashboard/projects/add',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}