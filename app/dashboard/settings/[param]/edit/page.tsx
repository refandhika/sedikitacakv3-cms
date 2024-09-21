import EditForm from '@/app/ui/settings/edit-form';
import Breadcrumbs from '@/app/ui/settings/breadcrumbs';
 
export default async function Page({ params }: { params: { param: string } }) {
  const id = params.param;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/dashboard/settings' },
          {
            label: 'Edit Setting',
            href: `/dashboard/settings/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm id={id} />
    </main>
  );
}