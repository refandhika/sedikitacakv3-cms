import EditForm from '@/app/ui/roles/edit-form';
import Breadcrumbs from '@/app/ui/roles/breadcrumbs';
 
export default async function Page({ params }: { params: { uuid: string } }) {
  const id = params.uuid;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Roles', href: '/dashboard/roles' },
          {
            label: 'Edit Roles',
            href: `/dashboard/roles/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm id={id} />
    </main>
  );
}