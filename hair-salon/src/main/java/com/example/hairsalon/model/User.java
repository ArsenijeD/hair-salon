package com.example.hairsalon.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "USERS")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "FIRST_NAME", length = 50, nullable = false)
	private String firstName;
	
	@Column(name = "LAST_NAME", length = 50, nullable = false)
	private String lastName;

	@Column(name="USERNAME", unique = true, length = 50, nullable = false)
	private String username;

	@Column(name = "PASSWORD", length = 100, nullable = false)
	private String password;

	@Column(name = "DATE_OF_BIRTH", nullable = false)
	private LocalDateTime dateOfBirth;

	@Column(name = "PHONE_NUMBER", nullable = false)
	private String phoneNumber;

	@Column(name = "GENDER", nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "USER_AUTHORITY",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "id")})
    private List<Authority> userAuthorities;

	@OneToMany
	@JoinTable(
			name = "USER_SCHEDULED_RESERVATION",
			joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name = "ROLE", referencedColumnName = "id")})
	@ToString.Exclude
	private List<Reservation> scheduledReservations;

	@OneToMany
	@JoinTable(
			name = "USER_APPROVED_RESERVATION",
			joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name = "RESERVATION_ID", referencedColumnName = "id")})
	@ToString.Exclude
	private List<Reservation> approvedReservations;

	@OneToMany
	@JoinTable(
			name = "USER_SERVED_RESERVATION",
			joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name = "RESERVATION_ID", referencedColumnName = "id")})
	@ToString.Exclude
	private List<Reservation> servedReservations;

	//TODO Find lombok way to create this copy-constructor
	public User(User user) {
		this.id = user.getId();
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.dateOfBirth = user.getDateOfBirth();
		this.gender = user.getGender();
		this.setPhoneNumber(user.getPhoneNumber());
		this.userAuthorities = new ArrayList<>(user.getUserAuthorities());
		this.scheduledReservations = new ArrayList<>(user.getScheduledReservations());
		this.approvedReservations = new ArrayList<>(user.getApprovedReservations());
		this.servedReservations = new ArrayList<>(user.getServedReservations());
	}

	//TODO Consider making combination of firstName and lastName unique in order to avoid confusion for customers with the same firstname and lastname
}